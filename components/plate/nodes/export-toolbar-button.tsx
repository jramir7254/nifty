'use client';

import * as React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { MarkdownPlugin } from '@platejs/markdown';
import { ArrowDownToLineIcon } from 'lucide-react';
import { useEditorRef } from 'platejs/react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';

import { ToolbarButton } from './toolbar';
import { logger } from '@/lib/logger';


export function ExportToolbarButton(props: DropdownMenuProps & { editor?: unknown }) {
    const editor = useEditorRef();
    const [open, setOpen] = React.useState(false);

    const getCanvas = async () => {
        const { default: html2canvas } = await import('html2canvas-pro');

        const sourceNode = editor.api.toDOMNode(editor) as HTMLElement | null;
        if (!sourceNode) throw new Error('Editor DOM node not found');

        // Mark the exact node so we can find it in the cloned document
        sourceNode.setAttribute('data-export-capture', '1');

        try {
            const canvas = await html2canvas(sourceNode, {
                backgroundColor: '#ffffff',
                useCORS: true,
                onclone: (clonedDoc: Document) => {
                    // Force light scheme on cloned document
                    const html = clonedDoc.documentElement;
                    const body = clonedDoc.body;

                    html.style.colorScheme = 'light';
                    body.style.colorScheme = 'light';

                    html.classList.remove('dark');
                    body.classList.remove('dark');

                    // Common theme attrs (next-themes / shadcn variants)
                    html.setAttribute('data-theme', 'light');
                    html.setAttribute('data-mode', 'light');

                    html.style.background = '#fff';
                    body.style.background = '#fff';
                    body.style.color = '#000';

                    // Find the exact cloned editor root
                    const clonedCaptureRoot = clonedDoc.querySelector(
                        '[data-export-capture="1"]'
                    ) as HTMLElement | null;

                    // If your theme is applied on a wrapper, force that wrapper too
                    const themeHost =
                        clonedCaptureRoot?.closest('[data-theme]') as HTMLElement | null;

                    if (themeHost) {
                        themeHost.classList.remove('dark');
                        themeHost.setAttribute('data-theme', 'light');
                        themeHost.style.colorScheme = 'light';
                        themeHost.style.background = '#fff';
                        themeHost.style.color = '#000';
                    }

                    // Read-only editor root selectors (contenteditable=false / slate root)
                    const editorElement =
                        (clonedCaptureRoot?.querySelector('[contenteditable="false"]') as HTMLElement | null) ??
                        (clonedCaptureRoot?.querySelector('[data-slate-editor="true"]') as HTMLElement | null) ??
                        (clonedCaptureRoot?.matches?.('[data-slate-editor="true"]')
                            ? clonedCaptureRoot
                            : null);

                    if (editorElement) {
                        editorElement.style.background = '#fff';
                        editorElement.style.color = '#000';
                        editorElement.style.fontFamily =
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
                    }

                    // Optional: if your shadcn theme relies on CSS variables, override them in clone
                    html.style.setProperty('--background', '0 0% 100%');
                    html.style.setProperty('--foreground', '222.2 84% 4.9%');
                    html.style.setProperty('--card', '0 0% 100%');
                    html.style.setProperty('--card-foreground', '222.2 84% 4.9%');
                    html.style.setProperty('--popover', '0 0% 100%');
                    html.style.setProperty('--popover-foreground', '222.2 84% 4.9%');
                },
            });

            return canvas;
        } finally {
            sourceNode.removeAttribute('data-export-capture');
        }
    };

    const downloadFile = async (url: string, filename: string) => {
        const response = await fetch(url);

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.append(link);
        link.click();
        link.remove();

        // Clean up the blob URL
        window.URL.revokeObjectURL(blobUrl);
    };

    const exportToPdf = async () => {
        const canvas = await getCanvas();

        const PDFLib = await import('pdf-lib');
        const { PDFDocument } = PDFLib;

        const pdfDoc = await PDFDocument.create();

        // A4 portrait in PDF units (roughly points)
        const pageWidth = 595.28;
        const pageHeight = 841.89;

        const margin = 24;
        const printableWidth = pageWidth - margin * 2;
        const printableHeight = pageHeight - margin * 2;

        // Scale canvas to fit page width
        const scale = printableWidth / canvas.width;

        // How many source-canvas pixels fit vertically on one PDF page
        const sliceHeightPx = Math.max(1, Math.floor(printableHeight / scale));

        let offsetY = 0;

        while (offsetY < canvas.height) {
            const remaining = canvas.height - offsetY;
            const currentSliceHeightPx = Math.min(sliceHeightPx, remaining);

            // Create a temporary canvas for this page slice
            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = currentSliceHeightPx;

            const ctx = pageCanvas.getContext('2d');
            if (!ctx) throw new Error('Could not create page canvas context');

            // White background (important for transparent areas)
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

            // Copy a vertical slice from the full canvas
            ctx.drawImage(
                canvas,
                0,                    // sx
                offsetY,              // sy
                canvas.width,         // sWidth
                currentSliceHeightPx, // sHeight
                0,                    // dx
                0,                    // dy
                pageCanvas.width,     // dWidth
                pageCanvas.height     // dHeight
            );

            const pngDataUrl = pageCanvas.toDataURL('image/png');
            const imageEmbed = await pdfDoc.embedPng(pngDataUrl);

            const page = pdfDoc.addPage([pageWidth, pageHeight]);

            const drawWidth = printableWidth;
            const drawHeight = currentSliceHeightPx * scale;

            // Place image slice on page with top margin alignment
            page.drawImage(imageEmbed, {
                x: margin,
                y: pageHeight - margin - drawHeight,
                width: drawWidth,
                height: drawHeight,
            });

            offsetY += currentSliceHeightPx;
        }

        // Save bytes (simpler than saveAsBase64 + fetch)
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'plate.pdf';
        document.body.append(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(blobUrl);
    };


    const exportToMarkdown = async () => {
        const md = editor.getApi(MarkdownPlugin).markdown.serialize();
        const url = `data:text/markdown;charset=utf-8,${encodeURIComponent(md)}`;
        await downloadFile(url, 'plate.md');
    };



    return (
        <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
            <DropdownMenuTrigger asChild>
                <ToolbarButton pressed={open} tooltip="Export" isDropdown>
                    <ArrowDownToLineIcon className="size-4" />
                </ToolbarButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={exportToPdf}>
                        Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={exportToMarkdown}>
                        Export as Markdown
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
