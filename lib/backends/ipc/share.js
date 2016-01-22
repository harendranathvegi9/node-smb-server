/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2015 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

'use strict';

var util = require('util');

var Share = require('../../spi/share');
var IPCTree = require('./tree');

/**
 * Creates an instance of IPCShare.
 *
 * @constructor
 * @this {IPCShare}
 * @param {String} name share name
 * @param {Object} config configuration hash
 */
var IPCShare = function (name, config) {
  if (!(this instanceof IPCShare)) {
    return new IPCShare(name, config);
  }
  config = config || {};

  Share.call(this, name, config);

  this.description = config.description || 'Remote IPC';
};

// the IPCShare prototype inherits from Share
util.inherits(IPCShare, Share);

/**
 * Return a flag indicating whether this is a named pipe share.
 *
 * @return {Boolean} <code>true</code> if this is a named pipe share;
 *         <code>false</code> otherwise, i.e. if it is a disk share.
 */
IPCShare.prototype.isNamedPipe = function () {
  return true;
};

/**
 *
 * @param {Session} session
 * @param {Buffer|String} shareLevelPassword optional share-level password (may be null)
 * @param {Function} cb callback called with the connect tree
 * @param {String|Error} cb.error error (non-null if an error occurred)
 * @param {IPCTree} cb.tree connected tree
 */
IPCShare.prototype.connect = function (session, shareLevelPassword, cb) {
  var self = this;
  process.nextTick(function () { cb(null, new IPCTree(self)); });
};

module.exports = IPCShare;