standard_commands = ['влево', 'вправо', 'нц', 'кц']


def last_index_of(elem, array):
    count = -1
    for i in range(0, len(array)):
        if array[i] == elem:
            count = i
    return count


def array_to_string(array, sep):
    res = ''
    for item in array:
        res += item + sep
    return res


def count_brackets(code):
    lines = code.split('\n')
    res = [0, 0]
    for line in lines:
        if line.split()[0] == standard_commands[2]:
            res[0] += 1
        elif line.split()[0] == standard_commands[3]:
            res[1] += 1
        else:
            continue
    return res


def validate_code(code):
    if count_brackets(code)[0] != count_brackets(code)[1] \
            and count_brackets(code)[0] != 0 \
            and count_brackets(code)[1] != 0:
        return
    else:
        lines = code.split('\n')
        for i in range(0, len(lines)):
            if lines.split()[0] in standard_commands:
                command_parts = [item.strip() for item in lines[i].split() if item.strip() != '']
                for part in command_parts:
                    if part == 'нц':
                        first_index = i
                        last_index = last_index_of('кц', lines)
                        new_lines = [lines[i] for i in range(0, len(lines)) if i != first_index and i != last_index]
                        for j in range(0, int(command_parts[1])):
                            validate_code(array_to_string(new_lines, '\n'))
                    elif part == 'влево':
                        steps_left = command_parts[1]
                    elif part == 'вправо':
                        steps_right = command_parts[1]
                    else:
                        continue
            else:
                print('Something went wrong.')
