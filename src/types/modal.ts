export default interface ModalProps {
    title?: string
    subtitle?: string
    textButton?: string
    cancel?: string
    visible: boolean
    noswipe?: any
    paddingTitle?: string | number
    handleCancel: () => void
    handleAction: () => void
}
