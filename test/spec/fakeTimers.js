(function(){

    'use strict';

    var clock, throttles;

    throttles = function (callback) {
        var timer;
        return function () {
            clearTimeout(timer);
            var args = [].slice.call(arguments);
            timer = setTimeout(function () {
                callback.apply(this, args);
            }, 1000 * 10);
        };
    };

    beforeEach(function () {
        clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        clock.restore();
    });

    describe('test for sinon.useFakeTimers', function () {

        it('calls callback after 10 seconds', function () {

            var callback = sinon.spy(),
                throttle = throttles(callback);

            throttle();

            clock.tick(9999);
            expect(callback.called).to.not.be.ok();

            // 注意 : 時間は加算される
            clock.tick(1);
            expect(callback.called).to.be.ok();
        });

    });

}());
