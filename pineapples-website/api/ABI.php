<?php
$ABI = array (
  0 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => '_t1',
        'type' => 'address'
      ),
      2 => 
      array (
        'internalType' => 'address',
        'name' => '_t2',
        'type' => 'address'
      ),
      3 => 
      array (
        'internalType' => 'address',
        'name' => '_t3',
        'type' => 'address'
      ),
      4 => 
      array (
        'internalType' => 'address',
        'name' => '_t4',
        'type' => 'address'
      ),
      5 => 
      array (
        'internalType' => 'string',
        'name' => 'baseURI',
        'type' => 'string'
      )
    ),
    'stateMutability' => 'nonpayable',
    'type' => 'constructor'
  ),
  1 => 
  array (
    'anonymous' => false,
    'inputs' => 
    array (
      0 => 
      array (
        'indexed' => true,
        'internalType' => 'address',
        'name' => 'owner',
        'type' => 'address'
      ),
      2 => 
      array (
        'indexed' => true,
        'internalType' => 'address',
        'name' => 'approved',
        'type' => 'address'
      ),
      3 => 
      array (
        'indexed' => true,
        'internalType' => 'uint256',
        'name' => 'tokenId',
        'type' => 'uint256'
      )
    ),
    'name' => 'Approval',
    'type' => 'event'
  ),
  2 => 
  array (
    'anonymous' => false,
    'inputs' => 
    array (
      0 => 
      array (
        'indexed' => true,
        'internalType' => 'address',
        'name' => 'owner',
        'type' => 'address'
      ),
      1 => 
      array (
        'indexed' => true,
        'internalType' => 'address',
        'name' => 'operator',
        'type' => 'address'
      ),
      2 => 
      array (
        'indexed' => false,
        'internalType' => 'bool',
        'name' => 'approved',
        'type' => 'bool'
      )
    ),
    'name' => 'ApprovalForAll',
    'type' => 'event'
  ),
  3 => 
  array (
    'anonymous' => false,
    'inputs' => 
    array (
      0 => 
      array (
        'indexed' => true,
        'internalType' => 'address',
        'name' => 'previousOwner',
        'type' => 'address'
      ),
      1 => 
      array (
        'indexed' => true,
        'internalType' => 'address',
        'name' => 'newOwner',
        'type' => 'address'
      )
    ),
    'name' => 'OwnershipTransferred',
    'type' => 'event'
  ),
  4 => 
  array (
    'anonymous' => false,
    'inputs' => 
    array (
      0 => 
      array (
        'indexed' => false,
        'internalType' => 'bool',
        'name' => 'saleIsActive',
        'type' => 'bool'
      )
    ),
    'name' => 'SalesFlipped',
    'type' => 'event'
  ),
  5 => 
  array (
    'anonymous' => false,
    'inputs' => 
    array (
      0 => 
      array (
        'indexed' => true,
        'internalType' => 'address',
        'name' => 'from',
        'type' => 'address'
      ),
      1 => 
      array (
        'indexed' => true,
        'internalType' => 'address',
        'name' => 'to',
        'type' => 'address'
      ),
      => 
      array (
        'indexed' => true,
        'internalType' => 'uint256',
        'name' => 'tokenId',
        'type' => 'uint256'
      )
    ),
    'name' => 'Transfer',
    'type' => 'event'
  ),
  6 => 
  array (
    'inputs' => 
    array (),
    'name' => '_reserve',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => '',
        'type' => 'uint256'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  7 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => '_to',
        'type' => 'address'
      ),
      => 
      array (
        'internalType' => 'uint256',
        'name' => '_numberOfTokens',
        'type' => 'uint256'
      )
    ),
    'name' => 'airdropPineapple',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  ),
  8 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => 'to',
        'type' => 'address'
      ),
      => 
      array (
        'internalType' => 'uint256',
        'name' => 'tokenId',
        'type' => 'uint256'
      )
    ),
    'name' => 'approve',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  ),
  9 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => 'owner',
        'type' => 'address'
      )
    ),
    'name' => 'balanceOf',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => '',
        'type' => 'uint256'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  10 => 
  array (
    'inputs' => 
    array (),
    'name' => 'baseURI',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'string',
        'name' => '',
        'type' => 'string'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  11 => 
  array (
    'inputs' => 
    array (),
    'name' => 'flipSaleState',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  ),
  12 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => 'tokenId',
        'type' => 'uint256'
      )
    ),
    'name' => 'getApproved',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => '',
        'type' => 'address'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  13 => 
  array (
    'inputs' => 
    array (),
    'name' => 'getBaseURI',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'string',
        'name' => '',
        'type' => 'string'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  14 => 
  array (
    'inputs' => 
    array (),
    'name' => 'getPrice',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => '',
        'type' => 'uint256'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  15 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => 'owner',
        'type' => 'address'
      ),
      => 
      array (
        'internalType' => 'address',
        'name' => 'operator',
        'type' => 'address'
      )
    ),
    'name' => 'isApprovedForAll',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'bool',
        'name' => '',
        'type' => 'bool'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  16 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => '_numberOfTokens',
        'type' => 'uint256'
      )
    ),
    'name' => 'mintPineapple',
    'outputs' => 
    array (),
    'stateMutability' => 'payable',
    'type' => 'function'
  ),
  17 => 
  array (
    'inputs' => 
    array (),
    'name' => 'name',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'string',
        'name' => '',
        'type' => 'string'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  18 => 
  array (
    'inputs' => 
    array (),
    'name' => 'owner',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => '',
        'type' => 'address'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  19 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => 'tokenId',
        'type' => 'uint256'
      )
    ),
    'name' => 'ownerOf',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => '',
        'type' => 'address'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  20 => 
  array (
    'inputs' => 
    array (),
    'name' => 'price',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => '',
        'type' => 'uint256'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  21 => 
  array (
    'inputs' => 
    array (),
    'name' => 'renounceOwnership',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  ),
  22 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => 'from',
        'type' => 'address'
      ),
      => 
      array (
        'internalType' => 'address',
        'name' => 'to',
        'type' => 'address'
      ),
      => 
      array (
        'internalType' => 'uint256',
        'name' => 'tokenId',
        'type' => 'uint256'
      )
    ),
    'name' => 'safeTransferFrom',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  ),
  23 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => 'from',
        'type' => 'address'
      ),
      => 
      array (
        'internalType' => 'address',
        'name' => 'to',
        'type' => 'address'
      ),
      => 
      array (
        'internalType' => 'uint256',
        'name' => 'tokenId',
        'type' => 'uint256'
      ),
      => 
      array (
        'internalType' => 'bytes',
        'name' => '_data',
        'type' => 'bytes'
      )
    ),
    'name' => 'safeTransferFrom',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  ),
  24 => 
  array (
    'inputs' => 
    array (),
    'name' => 'saleIsActive',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'bool',
        'name' => '',
        'type' => 'bool'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  25 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => 'operator',
        'type' => 'address'
      ),
      => 
      array (
        'internalType' => 'bool',
        'name' => 'approved',
        'type' => 'bool'
      )
    ),
    'name' => 'setApprovalForAll',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  ),
  26 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'string',
        'name' => 'baseURI',
        'type' => 'string'
      )
    ),
    'name' => 'setBaseURI',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  ),
  27 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => '_newPrice',
        'type' => 'uint256'
      )
    ),
    'name' => 'setPrice',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  ),
  28 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'bytes4',
        'name' => 'interfaceId',
        'type' => 'bytes4'
      )
    ),
    'name' => 'supportsInterface',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'bool',
        'name' => '',
        'type' => 'bool'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  29 => 
  array (
    'inputs' => 
    array (),
    'name' => 'symbol',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'string',
        'name' => '',
        'type' => 'string'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  30 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'string',
        'name' => '',
        'type' => 'string'
      )
    ),
    'name' => 'team',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => '',
        'type' => 'address'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  31 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => 'index',
        'type' => 'uint256'
      )
    ),
    'name' => 'tokenByIndex',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => '',
        'type' => 'uint256'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  32 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => 'owner',
        'type' => 'address'
      ),
      => 
      array (
        'internalType' => 'uint256',
        'name' => 'index',
        'type' => 'uint256'
      )
    ),
    'name' => 'tokenOfOwnerByIndex',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => '',
        'type' => 'uint256'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  33 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => 'tokenId',
        'type' => 'uint256'
      )
    ),
    'name' => 'tokenURI',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'string',
        'name' => '',
        'type' => 'string'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  34 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => '_owner',
        'type' => 'address'
      )
    ),
    'name' => 'tokensOfOwner',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256[]',
        'name' => '',
        'type' => 'uint256[]'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  35 => 
  array (
    'inputs' => 
    array (),
    'name' => 'totalSupply',
    'outputs' => 
    array (
      0 => 
      array (
        'internalType' => 'uint256',
        'name' => '',
        'type' => 'uint256'
      )
    ),
    'stateMutability' => 'view',
    'type' => 'function'
  ),
  36 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => 'from',
        'type' => 'address'
      ),
      => 
      array (
        'internalType' => 'address',
        'name' => 'to',
        'type' => 'address'
      ),
      => 
      array (
        'internalType' => 'uint256',
        'name' => 'tokenId',
        'type' => 'uint256'
      )
    ),
    'name' => 'transferFrom',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  ),
  37 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'address',
        'name' => 'newOwner',
        'type' => 'address'
      )
    ),
    'name' => 'transferOwnership',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  ),
  38 => 
  array (
    'inputs' => 
    array (
      0 => 
      array (
        'internalType' => 'string',
        'name' => '_id',
        'type' => 'string'
      ),
      => 
      array (
        'internalType' => 'address',
        'name' => '_new',
        'type' => 'address'
      )
    ),
    'name' => 'updateAddress',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  ),
  39 => 
  array (
    'inputs' => 
    array (),
    'name' => 'withdraw',
    'outputs' => 
    array (),
    'stateMutability' => 'nonpayable',
    'type' => 'function'
  )
);
