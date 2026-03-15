<?php
/**
 * Plugin Name: Mizrahnik Floating Widgets
 * Description: Coupon button and scroll-to-top — shared across WP and Next.js.
 * Version:     1.0.0
 * Author:      Daniel Attia
 * License:     GPL-2.0-or-later
 */

defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', function () {
    $base = plugin_dir_url( __FILE__ ) . 'assets/';
    $ver  = '1.0.0';

    wp_enqueue_style(
        'miz-floating-widgets',
        $base . 'css/miz-floating-widgets.css',
        [],
        $ver
    );

    wp_enqueue_script(
        'miz-floating-widgets',
        $base . 'js/miz-floating-widgets.js',
        [],
        $ver,
        true
    );
});
