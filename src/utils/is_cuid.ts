const is_cuid_regexp = new RegExp("^c[a-z0-9]{24}$", "i");

export const isCuid = (cuid: string | undefined) => {
    if (!cuid) return false;
    return is_cuid_regexp.test(cuid); // .test() is more efficient than .match()
};
