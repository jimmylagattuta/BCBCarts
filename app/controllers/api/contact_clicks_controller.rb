module Api
  class ContactClicksController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def create
      click_details = contact_click_params.to_h

      click_details["ip_address"] = request.remote_ip
      click_details["request_user_agent"] = request.user_agent
      click_details["received_at"] = Time.current.iso8601

      ContactClickMailer.contact_click(click_details).deliver_now

      render json: {
        ok: true,
        message: "Contact click tracked successfully"
      }, status: :ok
    rescue => error
      Rails.logger.error("[ContactClicksController] #{error.class}: #{error.message}")
      Rails.logger.error(error.backtrace.join("\n")) if error.backtrace.present?

      render json: {
        ok: false,
        error: "contact_click_failed",
        message: error.message
      }, status: :internal_server_error
    end

    private

    def contact_click_params
      params.permit(
        :event_type,
        :contact_type,
        :label,
        :href,
        :page_url,
        :canonical_page_url,
        :referrer,
        :clicked_at,
        :user_agent,
        :language,
        :timezone,
        :timezone_offset_minutes,
        screen: [
          :width,
          :height
        ]
      )
    end
  end
end