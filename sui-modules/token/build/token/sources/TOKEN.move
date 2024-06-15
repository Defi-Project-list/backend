module token::TOKEN {
    use sui::url::{ Self, Url };
    use sui::coin::{ Self };
    use sui::address::{ Self };

    public struct TOKEN has drop {}

    fun init(witness: TOKEN, ctx: &mut TxContext) {
        let template_decimal: u8 = 0;
        let template_name: vector<u8> = b"ddddd";
        let template_symbol: vector<u8> = b"as";
        let template_description: vector<u8> = b"string";
        let template_icon_url: vector<u8> = b"https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/316301705_114932571436049_549628509009748365_n.jpg?stp=dst-jpg_p160x160&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHaIKEt134Xa2ZjdJrvilRUrDdtxUGd03esN23FQZ3Td7fMEvFORvSbm5TKvy8qC_fb1km34ZjkOpjj4ioMFklQ&_nc_ohc=AAR4ypSv3bcQ7kNvgFRIPnb&_nc_ht=scontent.fsgn2-9.fna&oh=00_AYBfZ74KcF4oeGwIBCsogyGLwPuj-tx_7GlBLephZ5vpnA&oe=6671FC2C";
        let template_total_supply: u64 = 1000;

        let icon_url : Option<Url>;
        if (vector::is_empty(&template_icon_url)) {
            icon_url = option::none();
        } else {
            icon_url = option::some(url::new_unsafe_from_bytes(template_icon_url));
        };

        let (mut treasuryCap, metadata) = coin::create_currency( 
        witness,
        template_decimal, 
        template_name, 
        template_symbol, 
        template_description, 
        icon_url, 
        ctx
        );

        transfer::public_freeze_object(metadata);
        
        coin::mint_and_transfer(&mut treasuryCap, template_total_supply, tx_context::sender(ctx), ctx);
        transfer::public_transfer(treasuryCap, address::from_u256(0));
    }
}

