"use strict";

function checkSyntax(str) {
    if (str === "") {
        return 0;
    }
    let open_brackets = ["<", "[", "{", "("];
    let close_brackets = [">", "]", "}", ")"];
    // another bracket set affects only on two arrays above, but not the solution itself
    let tmp_str = "";
    for (let i = 0; i < str.length; i++) {
        // if we meet an opening bracket, we save it in temporary string,
        // then if we meet the same closing bracket,
        // we remove the opening one from the temporary string
        let close_bracket_idx = close_brackets.indexOf(str[i]);
        if (open_brackets.indexOf(str[i]) != -1) {
            tmp_str += str[i];
        } else if (close_bracket_idx != -1) {
            if (open_brackets.indexOf(tmp_str[tmp_str.length - 1]) === close_bracket_idx) {
                tmp_str = tmp_str.slice(0, -1);
            }
        }
    }
    if (tmp_str === "") {
        return 0;
    }
    return 1;
}

try {
    test(checkSyntax, ["---(++++)----"], 0);
    test(checkSyntax, [""], 0);
    test(checkSyntax, ["before ( middle []) after "], 0);
    test(checkSyntax, [") ("], 1);
    test(checkSyntax, ["} {"], 1);
    test(checkSyntax, ["<(   >)"], 1);
    test(checkSyntax, ["(  [  <>  ()  ]  <>  )"], 0);
    test(checkSyntax, ["   (      [)"], 1);

    console.info("Congratulations! All tests passed.");
} catch(e) {
    console.error(e);
}

// Простая функция тестирования
function test(call, args, res, n) {
    let r = (call.apply(n, args) === res);
    console.assert(r, `Result: ${res}`);
    if (!r) throw "Test failed!";
}