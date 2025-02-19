/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { verifySignatureHandler } from "../backend_functions.ts";

describe('backend_functions', () => {
  describe('backend_functions#getMessage()', () => {
    it('should verify polygon signed message', async () => {
      const message = await verifySignatureHandler({
        signature: "0xebdfecfb51541220672079a8557739cd04de68941a715eb796eaabc4772d13fd647abc4268be47ef3ba2cdb73a09d86e500590bab5cb1120f8c4274bf65b864b1b",
        address: "0xFCCfC2581aEEB09871fcd8fe664f47Cd9D5ACe90",
        chain: "polygon",
        message: "2025-02-13T06:15:31.285Z"
      })
      expect(message).toBe(true);
    });

    it('should verify concordium signed message', async () => {
      const message = await verifySignatureHandler({
        signature: {
          "0": {
            "0": "252c0fda7d25964665d528686fcb7c313aaabbda2644d995bad23f864dbf4e538f8f9cf04f9561a16799329f53c2b2084f7b936da3ec4904dffceb5890bb540e"
          }
        },
        address: "4fWTMJSAymJoFeTbohJzwejT6Wzh1dAa2BtnbDicgjQrc94TgW",
        chain: "concordium",
        message: "2025-02-13T07:04:46.002Z"
      })
      expect(message).toBe(true);
    }, 20000);

    it('should not verify polygon signed message', async () => {
      const message = await verifySignatureHandler({
        signature: "0xebdfecfb51541220672079a8557739cd04de68941a715eb796eaabc4772d13fd647abc4268be47ef3ba2cdb73a09d86e500590bab5cb1120f8c4274bf65b864b1b",
        address: "0xFCCfC2581aEEB09871fcd8fe664f47Cd9D5ACe90",
        chain: "polygon",
        message: "2025-02-13T06:15:31.285Z SOME RANDOM THING"
      });
      expect(message).toBe(false);
    })

    it('should not verify concordium signed message', async () => {
      const message = await verifySignatureHandler({
        signature: {
          "0": {
            "0": "252c0fda7d25964665d528686fcb7c313aaabbda2644d995bad23f864dbf4e538f8f9cf04f9561a16799329f53c2b2084f7b936da3ec4904dffceb5890bb540e"
          }
        },
        address: "4fWTMJSAymJoFeTbohJzwejT6Wzh1dAa2BtnbDicgjQrc94TgW",
        chain: "concordium",
        message: "2025-02-13T07:04:46.002Z SOME RANDOM THING"
      })
      expect(message).toBe(false);
    })
  });
});
