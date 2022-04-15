const abi = [
  {
    inputs: [
      {
        internalType: "contract IRegistry",
        name: "_registry",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "dataOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "attester",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "cType",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "programHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fieldName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "proofCid",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "requestHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "rootHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint128[]",
        name: "expectResult",
        type: "uint128[]",
      },
    ],
    name: "AddProof",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "authority",
        type: "address",
      },
    ],
    name: "LogSetAuthority",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "LogSetOwner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "dataOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "kiltAccount",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "requestHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "proofCid",
        type: "string",
      },
    ],
    name: "UpdateProof",
    type: "event",
  },
  {
    inputs: [],
    name: "CONTRACT_AGGREGATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CONTRACT_MAIN_KILT",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CONTRACT_READ_GATEWAY",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CONTRACT_REPUTATION",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CONTRACT_REQUEST",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CONTRACT_REWARD",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NULL",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UINT32_MIN_COMMIT",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UINT32_THRESHOLD",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_kiltAccount",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_attester",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_cType",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "_fieldName",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "_programHash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "_proofCid",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "_rootHash",
        type: "bytes32",
      },
      {
        internalType: "uint128[]",
        name: "_expResult",
        type: "uint128[]",
      },
    ],
    name: "addProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "authority",
    outputs: [
      {
        internalType: "contract IAuthority",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "fatProofs",
    outputs: [
      {
        internalType: "string",
        name: "proofCid",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "kiltAddr2Addr",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registry",
    outputs: [
      {
        internalType: "contract IRegistry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_authority",
        type: "address",
      },
    ],
    name: "setAuthority",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_who",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_requestHash",
        type: "bytes32",
      },
    ],
    name: "single_proof_exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_kiltAccount",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_requestHash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "_proofCid",
        type: "string",
      },
      {
        internalType: "uint128[]",
        name: "_expResult",
        type: "uint128[]",
      },
    ],
    name: "update_proof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export default abi;
