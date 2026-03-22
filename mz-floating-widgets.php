<?php
/**
 * Plugin Name: Mizrahnik Floating Widgets
 * Description: Coupon button and scroll-to-top — shared across WP and Next.js.
 * Version:     1.0.6
 * Author:      Daniel Attia
 * License:     GPL-2.0-or-later
 */

defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', function () {
    $base = plugin_dir_url( __FILE__ ) . 'assets/';
    $ver  = '1.0.6';

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

// Prevent WP Rocket from removing/deferring this plugin's assets.
// The plugin creates DOM elements dynamically via JS, so RUCSS cannot detect its selectors.
add_filter( 'rocket_exclude_css', function ( $excluded ) {
    $excluded[] = '/wp-content/plugins/mz-floating-widgets/assets/css/miz-floating-widgets.css';
    return $excluded;
});

add_filter( 'rocket_delay_js_exclusions', function ( $excluded ) {
    $excluded[] = 'miz-floating-widgets';
    return $excluded;
});
