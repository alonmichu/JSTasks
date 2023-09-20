# JSTasks
## Задача №1
Написать функцию dscount, которая подсчитывает количество идущих подряд символов s1 и s2 в строке (кол-во цепочек s1s2), без учёта регистра.

**Решение:** идём по строке и попарно сравниваем символы, приведённые к нижнему регистру, с данными s1 и s2.
```javascript
function dscount(str, s1, s2) {
    let count = 0;
    for (let i = 0; i < str.length - 1; i++) {
        if (str[i].toLowerCase() === s1 && str[i + 1].toLowerCase() === s2) {
            count++;
        }
    }
    return count;
}
```
## Задача №2
Реализовать функцию ```checkSyntax(string)```, проверяющую на синтаксическую верность последовательность скобок. Задача не сводится к простой проверке сбалансированности скобок. Нужно еще учитывать их последовательность (вложенность).

**Решение:** для удобства запишем открывающие и закрывающие скобки в массивы. Важно, чтобы индексы соответствующих скобок совпадали. Далее идём по исходной строке и проверяем является ли каждый встреченный символ скобкой из объявленных массивов. Если встречается открывающая скобка, то добавляем во временную строку. Если скобка закрывающая и предыдущая перед ней во временной строке - соответствующая открывающая, то открывающую скобку из временной строки удаляем. Так, идём по всей строке и если в кнце временная строка пустая, то последовательность правильная, иначе неправильная. Если мы усеньшим набор скобок, то ход решения не поменяется, изменятся только массивы со скобками.
```javascript
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
```
## Задача №3
Реализовать функцию, на вход которой передаются
* массив целых чисел, упорядоченных по возрастанию,
* целое число. 

Функция должна найти 2 числа в массиве, которые в сумме дают переданное вторым параметром число и вернуть их индексы. Если таких чисел нет, то функция должна вернуть пустой объект или массив.

**Решение:** для начала отсеиваем случаи, когда найти индексы точно невозможно, проверяем самую маленькую и самую большую суммы. Далее будем идти по массиву и смотреть на все числа меньшие искомого, делённого на два (чтобы не рассматривать симметричные случаи). Для каждого встреченного числа смотрим есть ли в массиве второе число, дающее в сумме данное, с помощью бинарного поиска (т.к. массив упорядочен, это повысит эффективность в отличие от стандартного поиска). Если индекс нашли, то возвращяем найденные значения, иначе идём дальше. В случае, когда одно из чисел равно ровно половине данного, мы проверяем, есть ли ещё один экземпляр.
```javascript
function find_sum_idx(array, number) {
    if (array.length < 2) {
        return [];
    }
    let min_sum = array[0] + array[1];
    let max_sum = array[array.length - 1] + array[array.length - 2];
    if (number < min_sum || number > max_sum) {
        return [];
    }
    // we look at elements from the beginning till the moment when the current element is bigger than number/2
    // we check if there is an element equal to difference between number and current element in the array
    // if the sum need two equal elements we check that there are two similar numbers in the array
    for (let i = 0; i < array.length; i++) {
        if (array[i] <= number / 2) {
            let idx = binary_search(array, number - array[i]);
            if (idx != -1 && idx != i) {
                return [i, idx];
            } else if (idx === i && i != array.length - 1 && array[i + 1] === array[i]) {
                return [i, i + 1];
            }
        } else {
            break;
        }
    }
    return [];
}
```
## Задача №4
Реализуйте функцию ```parseUrl(string)```, которая будет парсить URL строку и возвращать объект с распарсенными данными.

**Решение:** вообще говоря, для решения этой задачи можно воспользоваться встроенным конструктором URL. Однако в данном задании требуется избегать готовых решений. Поэтому предлагается реализовать функцию с использованием регулярных выражений. Тут логика в делении на группы при встрече тех или иных символов ('//' для протокола, ':' для порта и т.д.).
```javascript
function parseUrl(url) {
    let regexp = /^((?:(\w+:)\/\/)?(((?:[\w-]+\.)+\w{2,})(?::(\d+))))?([\/\w.-]*)*(?:\?([^#]*))?(#.*)?$/;
    let match = regexp.exec(url);
    let res = {};
    res.href = match[0] || "";
    res.hash = match[8] || "";
    res.port = match[5] || "";
    res.host = match[3] || "";
    res.protocol = match[2] || "";
    res.hostname = match[4] || "";
    res.pathname = match[6] || "";
    res.origin = match[1] || "";
    return res;
}
```