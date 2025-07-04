class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const sulfuras = 'Sulfuras, Hand of Ragnaros';
const brie = 'Aged Brie';
const backstage = 'Backstage passes to a TAFKAL80ETC concert';
const conjured = 'Conjured';

const conjuredDegradationRate = 2
const pastSellInDegradationRate = 2


const backstageThresholdA = {"sellIn": 5,  "change":3};
const backstageThresholdB = {"sellIn": 10, "change":2};

const defaultQualityChange = 1;

const qualUpperLimit = 50;
const qualLowerLimit = 0;

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let item of this.items){

      if (item.name == sulfuras) continue;

      let qualityChange = this.calculateQualityChange(item);
  
      item.sellIn--;
      item.quality += qualityChange;

    }

    return this.items;
  }

  calculateQualityChange(item){
    let qualityChange;

    if (item.name == backstage) {
      if (item.sellIn <= backstageThresholdA.sellIn)
        qualityChange = backstageThresholdA.change
      else if (item.sellIn <= backstageThresholdB.sellIn)
        qualityChange = backstageThresholdB.change
      else qualityChange = defaultQualityChange
    }
    else if (item.name == brie)
      qualityChange = defaultQualityChange
    else
      qualityChange = -defaultQualityChange

    if (item.name.startsWith(conjured)){
      qualityChange *= conjuredDegradationRate;
    }

    if (item.sellIn <= 0) {
      if (item.name == backstage) {
        qualityChange = -item.quality
      }
      else {
        qualityChange *= pastSellInDegradationRate
      }
    }

    if (item.quality + qualityChange > qualUpperLimit) return qualUpperLimit - item.quality;
    if (item.quality + qualityChange < qualLowerLimit) return qualLowerLimit - item.quality;

    return qualityChange
  }

}

module.exports = {
  Item,
  Shop
}
