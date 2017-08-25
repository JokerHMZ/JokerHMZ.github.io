describe("大拇指点赞测试", function() {
    for(var i=0;i<10;i++){
        it("测试点赞"+1, function() {
            expect(dianZan.addOne(i)).toBe(i+1);
        });
    }
});