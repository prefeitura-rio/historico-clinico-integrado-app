export function isLoadingCombined(loadings: boolean[]) {
  loadings.forEach((item) => {
    if (item) return true
  })

  return false
}
