import { Injectable } from '@angular/core';
import {UploadClient} from "@uploadcare/upload-client";

@Injectable()
export class UploadcareService {
    private client = new UploadClient({publicKey: 'b66cb5aa61ed990132b2'})

    upload(file:any)
    {
        return this.client.uploadFile(file);
    }
}
