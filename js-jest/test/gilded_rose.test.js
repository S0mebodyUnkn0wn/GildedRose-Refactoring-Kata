const {Shop, Item} = require("../src/gilded_rose");

const backstage_passes = 'Backstage passes to a TAFKAL80ETC concert'
const brie = "Aged Brie";
const sulfuras = "Sulfuras, Hand of Ragnaros";

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
  it("should degrade", function() {
    const gildedRose = new Shop([new Item("foo", 5, 10)]);
    const items = gildedRose.updateQuality();
    
    expect(items[0].quality).toBe(9);
    expect(items[0].sellIn).toBe(4);
  });
  it("should degrade x2 after sellIn", function() {
    const gildedRose = new Shop([new Item("foo", 0, 10)]);
    let items = gildedRose.updateQuality();
    
    expect(items[0].quality).toBe(8);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);

  });
  it("quality is never negative", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    let items = gildedRose.updateQuality();
    
    expect(items[0].quality).toBe(0);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);

  });
  
});

describe("Backstage passes", function (){
  it("qual should increase by 1 if sellin>10", function() {
    const gildedRose = new Shop([new Item(backstage_passes, 11, 20)]);
    let items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(21);
  });
  
  it("qual should increase by 2 if sellin<=10", function() {
      const gildedRose = new Shop([new Item(backstage_passes, 10, 20)]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(22);

      items = gildedRose.updateQuality();
      
      expect(items[0].quality).toBe(24);

  });

  it("qual should increase by 3 if sellin<=5", function() {
      const gildedRose = new Shop([new Item(backstage_passes, 5, 20)]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);

      items = gildedRose.updateQuality();
      
      expect(items[0].quality).toBe(26);

  });

    it("qual should drop to 0 if sellin<0", function() {
      const gildedRose = new Shop([new Item(backstage_passes, 0, 20)]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);

  });

  it("quality is never over 50", function() {
      const gildedRose = new Shop([new Item(backstage_passes, 2, 50)]);
      gildedRose.updateQuality();
      let items = gildedRose.updateQuality();
      
      expect(items[0].quality).toBe(50);

  });
});

describe("Brie", function() {
  it("brie qual should increase", function() {
    const gildedRose = new Shop([new Item(brie, 1, 5)]);
    let items = gildedRose.updateQuality();
    
    expect(items[0].quality).toBe(6);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);

  });
  it("quality is never over 50", function() {
    const gildedRose = new Shop([new Item(brie, 0, 50)]);
    gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    
    expect(items[0].quality).toBe(50);

  });
});

describe("Sulfuras", function() {
  it("sulfuras does not drop in qual and sellIn", function() {
    const gildedRose = new Shop([new Item(sulfuras, 0, 80)]);
    let items = gildedRose.updateQuality();
    
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);

  });
});

describe("Conjured", function() {

  it("should degrade at 2x speed", function() {

    const gildedRose = new Shop([new Item("Conjured foo", 1, 20)])

    let items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(18);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(14);


  });



});
