const abi =  [
  {
    "inputs": [
      {
        "internalType": "contract IRegistry",
        "name": "_registry",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "dataOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "kiltAddress",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "cType",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "programHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "fieldName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "proofCid",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "rootHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "expectResult",
        "type": "bool"
      }
    ],
    "name": "AddProof",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "dataOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "worker",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "rootHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isPassed",
        "type": "bool"
      }
    ],
    "name": "AddVerification",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "dataowner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "cType",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "rootHash",
        "type": "bytes32"
      }
    ],
    "name": "FinalCredential",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "consumer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "cType",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "programHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "expectedResult",
        "type": "bool"
      }
    ],
    "name": "RegisterService",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "dataOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "cType",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "programHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isPassed",
        "type": "bool"
      }
    ],
    "name": "VerificationDone",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "CONTRACT_ACCESS",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "CONTRACT_MAIN_KILT",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "CONTRACT_WHITELIST",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "NULL",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "REGULATED_ERC20",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "UINT_APPROVE_THRESHOLD",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "UINT_MAX_KILT_CTYPES",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "UINT_MAX_TRUSTED_PROVIDERS",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_kiltAddress",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_cType",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_fieldName",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "_programHash",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_proofCid",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "_rootHash",
        "type": "bytes32"
      },
      {
        "internalType": "bool",
        "name": "_expectResult",
        "type": "bool"
      }
    ],
    "name": "addProof",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_project",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_cType",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_programHash",
        "type": "bytes32"
      },
      {
        "internalType": "bool",
        "name": "_expectedResult",
        "type": "bool"
      }
    ],
    "name": "addService",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_dataOwner",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_rootHash",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_cType",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_programHash",
        "type": "bytes32"
      },
      {
        "internalType": "bool",
        "name": "_isPassed",
        "type": "bool"
      }
    ],
    "name": "addVerification",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_dataOwner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_worker",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_rootHash",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_cType",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_programHash",
        "type": "bytes32"
      }
    ],
    "name": "hasSubmitted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_programHash",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_cType",
        "type": "bytes32"
      }
    ],
    "name": "isPassed",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_cType",
        "type": "bytes32"
      }
    ],
    "name": "isValid",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "registry",
    "outputs": [
      {
        "internalType": "contract IRegistry",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_cType",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_programHash",
        "type": "bytes32"
      }
    ],
    "name": "single_proof_exists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "submissionRecords",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "trustedPrograms",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_kiltAddress",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_cType",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_fieldName",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "_programHash",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_proofCid",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "_rootHash",
        "type": "bytes32"
      },
      {
        "internalType": "bool",
        "name": "_expectResult",
        "type": "bool"
      }
    ],
    "name": "update_proof",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
  ]

export default  abi 