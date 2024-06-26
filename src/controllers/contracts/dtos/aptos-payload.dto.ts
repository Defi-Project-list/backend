import { ApiProperty } from "@nestjs/swagger"

export class AptosPayloadArg {
  @ApiProperty()
      type: string
  @ApiProperty()
      value: string | Array<string>
}

export interface AptosPayload {
  functionId: string;
  typeArgs: Array<string>;
  args: Array<AptosPayloadArg>;
}

export interface AptosPublishPackageTxnPayload extends AptosPayload {
    functionId: "0x1::code::publish_package_txn"
    typeArgs: []
    args: [
    {
      type: "hex";
      value: string;
    },
    {
      type: "hex";
      value: Array<string>;
    },
  ]
}

export interface AptosCreateResourceAccountAndPublishPackage extends AptosPayload {
    functionId: "0x1::resource_account::create_resource_account_and_publish_package"
    typeArgs: []
    args: [
    {
      type: "hex";
      value: string;
    },
    {
      type: "hex";
      value: string;
    },
    {
      type: "hex";
      value: Array<string>;
    },
  ]
}
