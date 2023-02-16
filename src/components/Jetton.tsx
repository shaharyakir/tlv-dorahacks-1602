import { beginCell, toNano, Address, Cell, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useFaucetJettonContract } from "../hooks/useFaucetJettonContract";
import { useState } from "react";
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
  Input,
} from "./styled/styled";

export function Jetton() {
  const { connected } = useTonConnect();
  const { burn, mint, jettonWalletAddress, balance } =
    useFaucetJettonContract();
  const [amount, setAmount] = useState('0');

  return (
    <Card title="Jetton">
      <FlexBoxCol>
        <h3>Faucet Jetton</h3>
        <FlexBoxRow>
          Wallet
          <Ellipsis>{jettonWalletAddress}</Ellipsis>
        </FlexBoxRow>
        <FlexBoxRow>
          Balance
          <div>{balance ?? "Loading..."}</div>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          onClick={async () => {
            mint();
          }}
        >
          Get jettons from faucet
        </Button>
        <FlexBoxRow>
          <label>Burn amount </label>
          <Input
            style={{ marginRight: 8 }}
            value={amount}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          onClick={async () => {
            burn(toNano(amount));
          }}
        >
          🔥
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
