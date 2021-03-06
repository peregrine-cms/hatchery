/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable */
module.exports = function main(runtime) {
  const $ = {
    lengthOf: c => Array.isArray(c) ? c.length : Object.keys(c).length,
    out: runtime.out.bind(runtime),
    exec: runtime.exec.bind(runtime),
    xss: runtime.xss.bind(runtime),
    listInfo: runtime.listInfo.bind(runtime),
    use: runtime.use.bind(runtime),
    slyResource: runtime.resource.bind(runtime),
    call: runtime.call.bind(runtime),
    template: runtime.template.bind(runtime),
  };


  return runtime.run(function* () {

    let use = runtime.globals["use"];
    let test = runtime.globals["test"];
    const resource = runtime.globals;

    model = yield $.use("model", {});
    if (false) {
      $.out("<sly/>");
    }
    if (false) {
    }
    $.out("\n<div>");
    const var_0 = model["test"];
    $.out(var_0);
    $.out("</div>");

  });
};
