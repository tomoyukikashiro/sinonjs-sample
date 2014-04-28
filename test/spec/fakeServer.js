(function(){

    'use strict';

    /**
     * 注意 : responedで擬似リクエストを返すと、実際にAPIへのリクエストも飛ぶ
     *       useFakeXMLHttpRequestより手軽に使える
     */
    describe('test for fakeServer', function () {

        var server,
            func = function(num, callback) {
                $.ajax(
                    {
                        url: 'api/' + num,
                        error: function() {
                            console.log('[fakeServer] call original function ajax : error');
                        },
                        success: function(data) {
                            console.log('[fakeServer] call original function ajax : success');
                            callback(data);
                        }
                    }
                );
            };

        beforeEach(function () {
            server = sinon.fakeServer.create();
        });

        afterEach(function () {
            server.restore();
        });

        // この方法では、レスポンスの型を指定出来ない
        // 例えば、下記レスポンスだと、全て文字列としてしか判定出来ない
        it('check callback parameter', function () {
            var spy = sinon.spy();
            func(1, spy);
            server.requests[0].respond(200, '', '{data: 30}');
            expect(spy.calledWith('{data: 30}')).to.be.ok();
        });

        // 下記方法だと、レスポンスの型を指定できる
        // 通常こちらを利用する方がいい
        // 注意：レスポンスにしていするjsonオブジェクトのkeyはダブルクォーテーションでくくること
        it('check callback parameter with Object Type', function(){
            var spy = sinon.spy();

            server.respondWith(
                'GET',
                'api/1',
                [
                    200,
                    { 'Content-Type': 'application/json' },
                    '{"data": 30}'
                ]
            );

            func(1, spy);
            server.respond();

            expect(spy.calledWith({data: 30})).to.be.ok();

        });

    });

}());
