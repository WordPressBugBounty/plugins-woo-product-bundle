const {registerCheckoutFilters} = window.wc.blocksCheckout;

const woosbCartItemClass = (defaultValue, extensions, args) => {
    const isCartContext = args?.context === 'cart' || args?.context === 'summary';

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

const woosbCartItemPrice = (defaultValue, extensions, args, validation) => {
    const isCartContext = args?.context === 'cart';

    if (!isCartContext) {
        return defaultValue;
    }

    if (args?.cartItem?.woosb_bundles && args?.cartItem?.woosb_price) {
        return woosb_format_price(args?.cartItem?.woosb_price).replace(/<[^>]*>?/gm, '') + '<price/>';
    }

    return '<price/>';
};

registerCheckoutFilters('woosb-blocks', {
    cartItemClass: woosbCartItemClass, showRemoveItemLink: woosbShowRemoveItemLink, cartItemPrice: woosbCartItemPrice,
});

// https://github.com/woocommerce/woocommerce-blocks/blob/trunk/docs/third-party-developers/extensibility/checkout-block/available-filters/cart-line-items.md