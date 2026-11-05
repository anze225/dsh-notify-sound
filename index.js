// dsh-notify-sound — host loader entry.
// This plugin lives entirely in the browser: all behavior is in ./client.
// The host half is intentionally a no-op; its only job is to let the cordis
// loader register the package so dsh-client-modules publishes ./client to the
// web bundle (see dsh.client in package.json).
export function apply() {}
