<?php
defined( 'ABSPATH' ) || exit;

register_activation_hook( defined( 'WOOSB_LITE' ) ? WOOSB_LITE : WOOSB_FILE, 'woosb_activate' );
register_deactivation_hook( defined( 'WOOSB_LITE' ) ? WOOSB_LITE : WOOSB_FILE, 'woosb_deactivate' );
add_action( 'admin_init', 'woosb_check_version' );

function woosb_check_version() {
	if ( ! empty( get_option( 'woosb_version' ) ) && ( get_option( 'woosb_version' ) < WOOSB_VERSION ) ) {
		wpc_log( 'woosb', 'upgraded' );
		update_option( 'woosb_version', WOOSB_VERSION, false );
	}
}

function woosb_activate() {
	wpc_log( 'woosb', 'installed' );
	update_option( 'woosb_version', WOOSB_VERSION, false );
}

function woosb_deactivate() {
	wpc_log( 'woosb', 'deactivated' );
}

if ( ! function_exists( 'wpc_log' ) ) {
	function wpc_log( $prefix, $action ) {
		$logs = get_option( 'wpc_logs', [] );
		$user = wp_get_current_user();

		if ( ! isset( $logs[ $prefix ] ) ) {
			$logs[ $prefix ] = [];
		}

		$logs[ $prefix ][] = [
			'time'   => current_time( 'mysql' ),
			'user'   => $user->display_name . ' (ID: ' . $user->ID . ')',
			'action' => $action
		];

		update_option( 'wpc_logs', $logs, false );
	}
}