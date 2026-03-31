import React from 'react'
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "@/components/shadcn/button-group"
import { Button } from '@/components/shadcn/button'
export default function EditorHeader() {
    return (
        <div>
            <ButtonGroup>
                <Button
                    variant={'secondary'}
                    size="sm"
                >
                    Button 1
                </Button>
                <ButtonGroupSeparator />
                <Button
                    variant={'secondary'}
                    size="sm"
                >
                    Button 1
                </Button>
            </ButtonGroup>
        </div>
    )
}
