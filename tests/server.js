import { feature } from 'ava-spec';
import request from 'supertest';
import Nightmare from 'nightmare';
import server from '../index';

/*
 * TODO: These tests should be removed as they give unrealistic code coverage, but having them for the moment gives us a test and provides an example of testing with AVA
 */

const agent = request.agent(server);
const nightmare = new Nightmare();

/*
 * Basic test using feature/scenario for ensuring a route exists.
 */
feature('Server runs and makes available:', scenario => {
  scenario.cb('landing page', t => {
    agent
      .get('/')
      .expect(200)
      .end((err, res) => {
        t.is(err, null, 'Should not have an error');
        t.regex(res.text, /DOCTYPE html/, 'Should have an HTML Doctype');
        t.end();
      });
  });
});

/*
 * Basic Nightmare test to do in-browser testing
 */
feature('Content is available:', scenario => {
  // Create random ports and servers for each test
  scenario.cb.beforeEach(t => {
    // Need to assign to property as we need it available later on
    t.context.port = ~~(Math.random() * (8999 - 8000 + 1)) + 8000; // eslint-disable-line no-param-reassign
    t.context[`server-${t.context.port}`] = server.listen(t.context.port, () => { // eslint-disable-line no-param-reassign
      t.end();
    });
  });

  // Close each server after each test
  scenario.afterEach.cb(t => {
    t.context[`server-${t.context.port}`].close();
    t.end();
  });

  // Load the page, evaluate some stuff, and get the results.
  scenario('landing page that includes an intro H1', t => {
    return nightmare
      .goto(`http://localhost:${t.context.port}`)
      .evaluate(() => {
        /* eslint-env browser */
        return document.querySelector('h1').innerText;
      })
      .then(result => {
        t.is(result, 'Nightmare with AVA');
      });
  });
});
