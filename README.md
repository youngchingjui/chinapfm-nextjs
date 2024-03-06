# chinapfm-nextjs
Upload and clean transactions from China-based financial institutions

This repository is built with NextJS.

It will allow you to upload all raw transaction downloads from Chinese-based financial institutions, including Alipay, Wechat Pay, China Construction Bank, Bank of China, ICBC, etc.

The backend will do the following for your transactions:
- Parse the document with the correct encoding (some use `GB-18030`)
- Convert the `amount` column to actual number with +/- signs to denote credit/debit
- Remove any trailing white spaces
- De-dupe your transactions
- Save your transactions to a database

Additionally, there are complications when using either WeChat Pay / Alipay while connected to your bank source. Namely, lots of transaction details are saved on WeChat Pay / Alipay, but the transaction is debited directly from your bank account, but that metadata is not saved on the bank ledger. So this backend can additionally connect your WeChat Pay / Alipay transactions with their corresponding bank transaction, to provide fuller details for each transaction.

You'll still need to manually download the transactions yourself, because no Chinese institution provides any API access.

See here for [instructions on how to download your transactions](https://youngchingjui.notion.site/Downloading-Transactions-in-China-185f49c2b39d427e9c82e10041e281a9?pvs=74)
