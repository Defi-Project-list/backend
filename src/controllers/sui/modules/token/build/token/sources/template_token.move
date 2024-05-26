module token::template_token {
    use sui::url::{ Self, Url };
    use sui::coin::{ Self};

    public struct TEMPLATE_TOKEN has drop {}

    fun init(witness: TEMPLATE_TOKEN, ctx: &mut TxContext) {
        let template_decimal: u8 = 6;
        let template_name: vector<u8> = b"USD Tether";
        let template_symbol: vector<u8> = b"USDT";
        let template_description: vector<u8> = b"";
        let template_icon_url = vector::empty<u8>();

        let icon_url : Option<Url>;
        if (vector::is_empty(&template_icon_url)) {
            icon_url = option::none();
        } else {
            icon_url = option::some(url::new_unsafe_from_bytes(template_icon_url));
        };

        let (treasury, metadata) = coin::create_currency( 
        witness,
        template_decimal, 
        template_name, 
        template_symbol, 
        template_description, 
        icon_url, 
        ctx
        );

        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury, tx_context::sender(ctx))
    }
}

