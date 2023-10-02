export function ClassNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
