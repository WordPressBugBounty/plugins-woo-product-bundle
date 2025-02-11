const {registerCheckoutFilters} = window.wc.blocksCheckout;

const modifyCartItemClass = (defaultValue, extensions, args) => {
    if (args?.cartItem.woosb_bundles) {
        defaultValue += ' woosb-bundles';
    }

    if (args?.cartItem.woosb_bundled) {
        defaultValue += ' woosb-bundled';
    }

    if (args?.cartItem.woosb_hide_bundled) {
        defaultValue += ' woosb-hide-bundled';
    }

    return defaultValue;
};

registerCheckoutFilters('woosb-blocks', {
    cartItemClass: modifyCartItemClass,
});