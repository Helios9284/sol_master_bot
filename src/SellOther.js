require("dotenv").config();

const coinTicker = require("coin-ticker");
const web3 = require("@solana/web3.js");
const Web3 = require("web3");
const storage = require("node-persist");
const connection = new web3.Connection(process.env.RPC_URL);

storage.init();

const sellOther = async (chatId, bot, msgId) => {
  const userWallet = await storage.getItem(`userWallet_${chatId}`);

  let user_pub_key;
  let user_Wallet;
  user_pub_key = userWallet.publicKey;
  user_Wallet = userWallet;

  if (userWallet.network === "eth") {
    const web3 = new Web3(process.env.ETH_INFURA_URL);
    const balance = await web3.eth.getBalance(userWallet.eth.publicKey);

    const eth_balance = web3.utils.fromWei(balance, "ether");

    bot
      .sendMessage(
        chatId,
        `Reply with the amount to withdraw(0 - ${walletbalance})`,
        {
          reply_markup: { force_reply: true },
        }
      )
      .then((msg) => {
        bot.onReplyToMessage(chatId, msg.message_id, async (msg) => {
          const tokenAddress = msg.text;
          const token_info = await getPairAddress(
            tokenAddress,
            userWallet.network
          );

          const price = Number(token_info.priceNative);

          const name = token_info.name;
          const symbol = token_info.symbol;
          const market_cap = token_info.market_cap / 10000000;

          const sell_mark = {
            inline_keyboard: [
              [
                { text: "Home", callback_data: "home" },
                { text: "Close", callback_data: "close" },
              ],
              [
                { text: "Sell X", callback_data: "sell_buyx" },
              ],
              [
                {
                  text: "Explorer",
                  url: "https://etherscan.io/address/" + tokenAddress,
                },
                {
                  text: "Birdeye",
                  url: "https://birdeye.so/token/" + tokenAddress,
                },
              ],
              [{ text: "Refresh", callback_data: "Sell_refresh" }],
            ],
          };
          const text =
            `${name} | <b>${symbol}</b> |\n<code>${tokenAddress}</code>\n\n` +
            `Value: <b>$${value.toFixed(2)}</b> / <b>${sol_value.toFixed(
              4
            )} SOL</b>\n` +
            `Mcap: <b>$${market_cap.toFixed(2)}M</b> @ <b>$${price.toFixed(4)}</b>\n` +
            `5m: <b>-1.06%</b>, 1h: <b>-0.18%</b>, 6h: <b>-0.12%</b>, 24h: <b>+13.62%</b>\n\n` +
            `Balance: <b>${tokenAmount.toFixed(2)} ${symbol}</b>\n` +
            `Wallet Balance: <b>${eth_balance.toFixed(5)} SOL</b>\n`;

          if (!msgId) {
            bot.sendMessage(chatId, text, {
              reply_markup: sell_mark,
              parse_mode: "html",
            });
          } else {
            bot.editMessageText(text, {
              chat_id: chatId,
              message_id: msgId,
              reply_markup: sell_mark,
              parse_mode: "html",
            });
          }
        });
      });
  }
};

module.exports = {
  sellOther,
};
