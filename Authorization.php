<?php
$currentUserRole = "Member";

$features = array(
    "Edit" => "Admin",
    "Delete" => "Admin",
    "Add" => "Member"
);

function Permit($feature, $role) {
    global $features;
    return isset($features[$feature]) && $features[$feature] === $role;
}

$requestedFeature = "Edit";
if (Permit($requestedFeature, $currentUserRole)) {
    echo "You're permitted to $requestedFeature.";
} else {
    echo "You're not permitted to $requestedFeature.";
}
?>