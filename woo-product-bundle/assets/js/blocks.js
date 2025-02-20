const {registerCheckoutFilters} = window.wc.blocksCheckout;

const woosbCartItemClass = (defaultValue, extensions, args) => {
    const isCartContext = args?.context === 'cart';

    if (!isCartContext) {
        return defaultValue;
    }

    if (args?.cartItem?.woosb_bundles) {
        defaultValue += ' woosb-bundles';
    }

    if (args?.cartItem?.woosb_bundled) {
        defaultValue += ' woosb-bundled';
    }

    if (args?.cartItem?.woosb_hide_bundled) {
        defaultValue += ' woosb-hide-bundled';
    }

    if (args?.cartItem?.woosb_fixed_price) {
        defaultValue += ' woosb-fixed-price';
    }

    return defaultValue;
};

const woosbShowRemoveItemLink = (defaultValue, extensions, args) => {
    const isCartContext = args?.context === 'cart';

    if (!isCartContext) {
        return defaultValue;
    }

    if (args?.cartItem?.woosb_bundled) {
        return false;
    }

    return defaultValue;
};

registerCheckoutFilters('woosb-blocks', {
    cartItemClass: woosbCartItemClass, showRemoveItemLink: woosbShowRemoveItemLink,
});

// https://github.com/woocommerce/woocommerce-blocks/blob/trunk/docs/third-party-developers/extensibility/checkout-block/available-filters/cart-line-items.md