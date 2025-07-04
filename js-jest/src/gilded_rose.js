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
      if (item.sellIn < 6)
        qualityChange = 3
      else if (item.sellIn < 11)
        qualityChange = 2
      else qualityChange = 1
    }
    else if (item.name == brie)
      qualityChange = 1 
    else
      qualityChange = -1

    if (item.sellIn <= 0) {
      if (item.name == backstage) {
        qualityChange=-item.quality
      }
      else {
        qualityChange*=2
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
