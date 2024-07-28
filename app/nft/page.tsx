
'use client'

import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import React, { useState, useEffect } from "react";
import { parseAbiItem, Log } from "viem";

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

type blockTypes = {
  hash: string;
  number: string;
};
const ownerOfAbi = parseAbiItem(
  "function ownerOf(uint256 tokenId) view returns (address)"
);
const uriOfAbi = parseAbiItem(
  "function tokenURI(uint256 tokenId) view returns(string)"
);


export default function Counter() {

  const [owner, setOwner] = useState<string>();
  const [uri, setUri] = useState<string>();
  const [info, setInfo] = useState<JSON>();
  const contractAddress = '0483b0dfc6c78062b9e999a82ffb795925381415';

  useEffect(() => {
    const fetchBlockNumber = async () => {

      const ownerAddress: string = await client.readContract({
        address: `0x${contractAddress}`,
        abi: [ownerOfAbi],
        functionName: "ownerOf",
        args: [BigInt(357)],
      });
      setOwner(ownerAddress);
      // console.log(ownerAddress + "   owner");

      const uriInfo: string = await client.readContract({
        address: `0x${contractAddress}`,
        abi: [uriOfAbi],
        functionName: "tokenURI",
        args: [BigInt(357)],
      });
      setUri(uriInfo);


      const httpUrl = uriInfo.replace('ipfs://', 'https://ipfs.io/ipfs/');
      console.log(`转换后的HTTP URL: ${httpUrl}`);
      setUri(httpUrl);

      const response = await fetch(httpUrl,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(response => response);

      const metadata = await response.json();
      console.log('NFT元数据:', metadata);
      setInfo(metadata);

    };

    fetchBlockNumber();

  }, []);

  console.log(owner + "   setOwner");


  return (
    <div>
      <p>nft owner of {owner} </p>


      <pre>
        {JSON.stringify(info, null, 2)}
      </pre>

    </div>


  )
}