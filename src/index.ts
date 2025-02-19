import { verifySignatureHandler } from "./backend_functions.ts";

const message = verifySignatureHandler({
        signature: "0xebdfecfb51541220672079a8557739cd04de68941a715eb796eaabc4772d13fd647abc4268be47ef3ba2cdb73a09d86e500590bab5cb1120f8c4274bf65b864b1b",
        address: "0xFCCfC2581aEEB09871fcd8fe664f47Cd9D5ACe90",
        chain: "polygon",
        message: "2025-02-13T06:15:31.285Z"
      })