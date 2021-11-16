export default interface BaseView {
  onViewModelChanged(): void

  scrollToBottom?(): void
}
