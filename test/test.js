'use strict';

const Test = require('tape');
const Logging = require('../lib');
const Util = require('util');

Test('logger', (t) => {

    t.test('subscribe and unsubscribe', (t) => {
        t.plan(6);

        let logged = 0;

        const logger = Logging.createLogger('test-subscribe');

        const subscription1 = Logging.subscribe(
            ({ source, name, timestamp, tags, data }) => {
                logged++;
                t.equal(source, 'log-emit', 'source is correct.');
                t.equal(name, 'test-subscribe', 'name is correct.');
                t.ok(Util.isNumber(timestamp), 'timestamp is a number.');
                t.ok(Util.isArray(tags), 'tags is an array.');
                t.equal(data, 'hello world', 'data is correct.');
            }
        );

        const subscription2 = Logging.subscribe(
            ({ source, name, timestamp, tags, data }) => {
                logged++;
            }
        );

        logger.log('hello world');

        subscription1.unsubscribe();

        logger.log('hello world');

        subscription2.unsubscribe();

        t.equal(logged, 3);
    });

});
