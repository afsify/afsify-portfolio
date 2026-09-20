// Match the existing grid and the source width needed by object-fit: cover.
// A tall crop of a square portrait, or a wide photo in a taller card, needs
// more source pixels than the element's CSS width alone suggests.
export const heroProfileSizes = "(max-width: 699px) 260px, (max-width: 899px) calc(44vw - 44px), 366px";
export const aboutProfileSizes = "(max-width: 699px) min(380px, calc(100vw - 40px)), (max-width: 899px) calc(56vw - 59px), (max-width: 1100px) calc(46vw - 56px), (max-width: 1599px) min(512px, calc(46vw - 90px)), min(550px, calc(46vw - 112px))";

const recognitionCardSizes = "(max-width: 699px) calc(100vw - 40px), (max-width: 899px) calc((100vw - 108px) / 3), (max-width: 1100px) calc((100vw - 124px) / 3), (max-width: 1599px) min(383px, calc((100vw - 164px) / 3)), min(410px, calc((100vw - 212px) / 3))";
// The 2048:1328 graduation photo is wider than the unchanged 1.24/1.27 cards.
const recognitionWideSizes = "(max-width: 699px) calc(121.5vw - 48.6px), (max-width: 899px) calc(41.5vw - 44.82px), (max-width: 1100px) calc(41.5vw - 51.46px), (max-width: 1599px) min(477px, calc(41.5vw - 68.06px)), min(510px, calc(41.5vw - 87.98px))";

export function recognitionImageSizes(src: string) {
  return src.endsWith("brototype-graduation.webp") ? recognitionWideSizes : recognitionCardSizes;
}
