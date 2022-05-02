import * as crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(this.height, this.prevHash, this.data);
  }
  static calculateHash = (
    height: number,
    prevHash: string,
    data: string
  ): string => {
    return crypto
      .createHash("sha256")
      .update(height + prevHash + data)
      .digest("hex");
  };
}

class Blockchain {
  private blocks: Block[] = [];

  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const block = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(block);
  }

  public getBlocks() {
    return [...this.blocks];
  }
}

const blockchain = new Blockchain();

blockchain.addBlock("1 block");
blockchain.addBlock("2 block");
blockchain.addBlock("3 block");
blockchain.addBlock("4 block");

console.log(blockchain.getBlocks());
