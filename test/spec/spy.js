(function () {
    'use strict';

    describe('test for sinon.spy', function () {

        var org = function(){ console.log('[spy] called original function');};

        it('spy object function', function () {
            var obj = {},
                spy;

            obj.callback = org;
            spy = sinon.spy(obj, 'callback');

            obj.callback();

            expect(spy.called).to.be.ok();
            spy.restore();
        });

        it('spy static function in class', function () {
            var cls = function(){},
                spy;

            cls.callback = org;
            spy = sinon.spy(cls, 'callback');

            cls.callback();

            expect(spy.called).to.be.ok();
            spy.restore();
        });

        it('spy instance function in class', function () {
            var Cls = function(){
                    this.callback = org;
                },
                inst = new Cls(),
                spy = sinon.spy(inst, 'callback');

            inst.callback();

            expect(spy.called).to.be.ok();
            spy.restore();
        });

        it('spy prototype function in class', function () {
            var Cls = function(){},
                inst,
                spy;

            Cls.prototype.callback = org;
            inst = new Cls();
            spy = sinon.spy(inst, 'callback');

            inst.callback();

            expect(spy.called).to.be.ok();
            spy.restore();
        });
    });

})();
