export function isHiringPath(path: string) {
  return /^\/(?:contracts|jobs|employers)(?:\/|$)/i.test(path)
}
