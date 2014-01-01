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

        it('check callback parameter', function () {
            var spy = sinon.spy();
            func(1, spy);
            server.requests[0].respond(200, '', '{data: 30}');
            expect(spy.calledWith('{data: 30}')).to.be.ok();
        });

    });

}());
