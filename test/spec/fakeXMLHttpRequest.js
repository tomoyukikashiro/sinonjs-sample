(function(){
    'use strict';

    /**
     * 注意 : responedで擬似リクエストを返すと、実際にAPIへのリクエストも飛ぶ
     */
    describe('test for sinon.useFakeXMLHttpRequest', function () {

        var xhr, requests,
            func = function(num, callback) {
                $.ajax(
                    {
                        url: 'api/' + num,
                        error: function() {
                            console.log('[useFakeXMLHttpRequest] call original function ajax : error');
                        },
                        success: function(data) {
                            console.log('[useFakeXMLHttpRequest] call original function ajax : success');
                            callback(data);
                        }
                    }
                );
            };

        beforeEach(function () {
            xhr = sinon.useFakeXMLHttpRequest();
            requests = [];
            xhr.onCreate = function (req) { requests.push(req); };
        });

        afterEach(function () {
            xhr.restore();
        });

        it('check request parameter', function () {
            func(1, sinon.spy());
            expect(requests[0].url).to.eql('api/1');
        });

        it('check callback parameter', function () {
            var spy = sinon.spy();
            func(1, spy);
            requests[0].respond(200, '', '{data: 30}');
            expect(spy.calledWith('{data: 30}')).to.be.ok();
        });
    });
}());
