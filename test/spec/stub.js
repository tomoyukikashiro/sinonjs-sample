(function(){
    'use strict';

    describe('test for sinon.stub', function () {

        var obj = function(){},
            add1;

        obj.returnNum = function() {
            console.log('[stub] call original function');
            return 1;
        };
        add1 = function (){
            return obj.returnNum() + 1;
        };

        it('return expect value', function () {
            expect(add1()).to.eql(2);
        });

        it('change return value by using stub', function () {
            var stub = sinon.stub(obj, 'returnNum');
            stub.returns(2);

            expect(add1()).to.not.eql(2);
            expect(add1()).to.eql(3);
            stub.restore();
        });

        it('test for ajax function', function () {
            var func = function(num, callback) {
                    $.ajax(
                        {
                            url: 'api/' + num,
                            error: function() {
                                console.log('[stub] call original function ajax'); // do not call
                            },
                            success: function(data) {
                                console.log('[stub] call original function ajax'); // do not call
                                callback(data);
                            }
                        }
                    );
                },
                spy = sinon.spy();

            sinon.stub($, 'ajax');
            func(42, spy);

            expect($.ajax.calledWithMatch({url: 'api/42'})).to.be.ok();
            $.ajax.restore();
        });

        it('↑ same test by using spy', function () {
            var func = function(num, callback) {
                    $.ajax(
                        {
                            url: 'api/' + num,
                            error: function() {
                                console.log('[stub] call original function ajax'); // do not call
                            },
                            success: function(data) {
                                console.log('[stub] call original function ajax'); // do not call
                                callback(data);
                            }
                        }
                    );
                },
                spy = sinon.spy();

            sinon.spy($, 'ajax');
            func(42, spy);

            expect($.ajax.calledWithMatch({url: 'api/42'})).to.be.ok();
            $.ajax.restore();
        });
    });

}());
