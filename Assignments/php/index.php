<?php

session_start();

$count = 0;

$count++;

echo "<h2>1. Normal Variable</h2>";
echo "<p>Normal count: {$count}</p>";

if (!isset($_SESSION['count'])) {
    $_SESSION['count'] = 0;
}


$_SESSION['count']++;

echo "<h2>2. Session Counter</h2>";
echo "<p>Refresh count: {$_SESSION['count']}</p>";

class Tracker
{
    public function __construct()
    {
        echo "<p>New request started.</p>";
    }

    public function __destruct()
    {
        echo "<p>Request ended.</p>";
    }
}


$tracker = new Tracker();

?>
