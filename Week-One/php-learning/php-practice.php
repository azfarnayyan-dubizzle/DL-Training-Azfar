<?php

/*
1. PHP syntax and tags
2. Variables and data types
3. Type juggling
4. Variable scope
5. Superglobals
6. Arrays
7. array_map()
8. array_reduce()
9. array_walk()
10. Array sorting
11. Array destructuring
12. Validation
13. OOP - classes, objects, methods
14. Magic methods
*/

$name = "Azfar";
$age = 25;

echo "Name: " . $name . "\n";
echo "Age: " . $age . "\n";

$string = "Hello PHP";
$integer = 100;
$float = 10.5;
$boolean = true;
$null = null;
$array = [1, 2, 3];

var_dump($string);
var_dump($integer);
var_dump($float);
var_dump($boolean);
var_dump($null);
var_dump($array);

$stringNumber = "10";
$number = 20;

$result = $stringNumber + $number;

echo "String number + integer = " . $result . "\n";

var_dump($stringNumber == $number); // false
var_dump($stringNumber === $number); // false

$anotherStringNumber = "20";

var_dump($anotherStringNumber == $number);  // true
var_dump($anotherStringNumber === $number); // false

$globalMessage = "I am global";

function localExample()
{
    $localMessage = "I am local";

    echo $localMessage . "\n";
}

localExample();

function globalExample()
{
    global $globalMessage;

    echo $globalMessage . "\n";
}

globalExample();


function counter()
{
    static $count = 0;

    $count++;

    echo "Counter: " . $count . "\n";
}

counter();
counter();
counter();

// Available in CLI as well as web requests
echo "PHP version: " . $_SERVER['PHP_VERSION'] . "\n";

echo "Script name: " . $_SERVER['SCRIPT_NAME'] . "\n";


// Other superglobals include:
// $_GET
// $_POST
// $_FILES
// $_COOKIE
// $_SESSION
// $_ENV
// $_REQUEST
// $GLOBALS

$numbers = [1, 2, 3, 4, 5];

print_r($numbers);

$user = [
    "name" => "Azfar",
    "age" => 25,
    "role" => "Developer"
];

print_r($user);

echo "User name: " . $user["name"] . "\n";

$numbers = [1, 2, 3, 4, 5];

$squaredNumbers = array_map(
    function ($number) {
        return $number * $number;
    },
    $numbers
);

print_r($squaredNumbers);


// Modern arrow function
$doubledNumbers = array_map(
    fn($number) => $number * 2,
    $numbers
);

print_r($doubledNumbers);

$numbers = [1, 2, 3, 4, 5];

$total = array_reduce(
    $numbers,
    fn($carry, $number) => $carry + $number,
    0
);

echo "Total: " . $total . "\n";

echo "\n===== 9. array_walk() =====\n";

$users = [
    "user1" => "Azfar",
    "user2" => "Ali",
    "user3" => "Ahmed"
];

array_walk(
    $users,
    function ($value, $key) {
        echo $key . " => " . $value . "\n";
    }
);

$numbers = [40, 10, 30, 20];

sort($numbers);

echo "sort():\n";
print_r($numbers);


$numbers = [40, 10, 30, 20];

rsort($numbers);

echo "rsort():\n";
print_r($numbers);

// Associative array

$ages = [
    "Peter" => 35,
    "Ben" => 37,
    "Joe" => 43
];

asort($ages);

echo "asort() - by value ascending:\n";
print_r($ages);


arsort($ages);

echo "arsort() - by value descending:\n";
print_r($ages);


ksort($ages);

echo "ksort() - by key ascending:\n";
print_r($ages);


krsort($ages);

echo "krsort() - by key descending:\n";
print_r($ages);

echo "\n===== 11. ARRAY DESTRUCTURING =====\n";

$marks = [80, 90, 75];

[$physics, $chemistry, $maths] = $marks;

echo "Physics: $physics\n";
echo "Chemistry: $chemistry\n";
echo "Maths: $maths\n";

[$physics, , $maths] = $marks;

echo "Physics: $physics\n";
echo "Maths: $maths\n";

$user = [
    "name" => "Azfar",
    "age" => 25,
    "role" => "Developer"
];

[
    "name" => $userName,
    "age" => $userAge
] = $user;

echo "Name: $userName\n";
echo "Age: $userAge\n";


// Nested destructuring

$data = [
    "user" => [
        "name" => "Azfar",
        "age" => 25
    ]
];

[
    "user" => [
        "name" => $nestedName,
        "age" => $nestedAge
    ]
] = $data;

echo "Nested name: $nestedName\n";
echo "Nested age: $nestedAge\n";

$email = "azfar@example.com";

if (filter_var($email, FILTER_VALIDATE_EMAIL) !== false) {
    echo "$email is valid\n";
} else {
    echo "$email is invalid\n";
}


$ip = "192.168.1.10";

if (filter_var($ip, FILTER_VALIDATE_IP) !== false) {
    echo "$ip is valid\n";
} else {
    echo "$ip is invalid\n";
}


$ageInput = "25";

if (filter_var($ageInput, FILTER_VALIDATE_INT) !== false) {
    echo "$ageInput is a valid integer\n";
} else {
    echo "$ageInput is invalid\n";
}

class User
{
    public string $name;
    public int $age;

    public function introduce(): string
    {
        return "My name is " . $this->name .
            " and I am " . $this->age . " years old.";
    }
}


// Creating object
$user = new User();

$user->name = "Azfar";
$user->age = 25;

echo $user->introduce() . "\n";


class Product
{
    public string $name;
    public float $price;

    public function __construct(string $name, float $price)
    {
        $this->name = $name;
        $this->price = $price;

        echo "Product created: " . $this->name . "\n";
    }

    public function getPrice(): float
    {
        return $this->price;
    }
}

$product = new Product("Laptop", 1500.00);

echo "Price: " . $product->getPrice() . "\n";


class Customer
{
    public function __construct(
        private string $name
    ) {}

    public function __toString(): string
    {
        return "Customer: " . $this->name;
    }
}

$customer = new Customer("Azfar");

echo $customer . "\n";

class Account
{
    private string $username = "azfar";

    public function __get($property)
    {
        if (property_exists($this, $property)) {
            return $this->$property;
        }

        return "Property '$property' does not exist.";
    }
}

$account = new Account();

echo $account->username . "\n";
echo $account->email . "\n";


class Profile
{
    private array $data = [];

    public function __set($property, $value)
    {
        $this->data[$property] = $value;
    }

    public function __get($property)
    {
        return $this->data[$property] ?? null;
    }
}

$profile = new Profile();

$profile->name = "Azfar";
$profile->role = "Developer";

echo $profile->name . "\n";
echo $profile->role . "\n";


class Service
{
    public function __call($method, $arguments)
    {
        echo "Method '$method' does not exist.\n";

        echo "Arguments:\n";

        print_r($arguments);
    }
}

$service = new Service();

$service->sendEmail("azfar@example.com");

class SecureUser
{
    public function __construct(
        private string $name,
        private string $password
    ) {}

    public function __debugInfo(): array
    {
        return [
            "name" => $this->name,
            "password" => "HIDDEN"
        ];
    }
}

$secureUser = new SecureUser(
    "Azfar",
    "super-secret-password"
);

var_dump($secureUser);

class Calculator
{
    public function __invoke(int $a, int $b): int
    {
        return $a + $b;
    }
}

$calculator = new Calculator();

$result = $calculator(10, 20);

echo "10 + 20 = " . $result . "\n";
