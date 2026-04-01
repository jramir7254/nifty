type AssignmentParams = {
    topic?: string | null
}

type SlateNode = {
    children?: SlateNode[]
    text?: string
}

type AssignmentTitleSource = {
    content?: unknown
    name?: string | null
    params?: AssignmentParams | null
}

function collectText(node: unknown): string[] {
    if (!node || typeof node !== 'object') {
        return []
    }

    const currentNode = node as SlateNode
    const text = typeof currentNode.text === 'string' ? [currentNode.text] : []
    const children = Array.isArray(currentNode.children)
        ? currentNode.children.flatMap(collectText)
        : []

    return [...text, ...children]
}

export function getPlainText(content: unknown) {
    if (!Array.isArray(content)) {
        return ''
    }

    return content
        .flatMap(collectText)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()
}

export function getAssignmentTitle(source: AssignmentTitleSource) {
    const plainText = getPlainText(source.content)

    return (
        source.name?.trim() ||
        source.params?.topic?.trim() ||
        plainText.split(/[.!?]/)[0]?.trim() ||
        'Untitled assignment'
    )
}
