export const leftPad = (value) => value < 10 ? '0' + value : value
export const formatTime = (seconds) => `${leftPad(Math.floor(seconds / 60))}:${leftPad(seconds % 60)}`