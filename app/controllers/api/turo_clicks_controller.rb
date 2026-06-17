module Api
  class TuroClicksController < ApplicationController
    skip_before_action :authenticate_user, only: [:create]
    skip_before_action :verify_authenticity_token

    def create
      turo_click_params = params.permit(
        :event_type,
        :vehicle_id,
        :vehicle_name,
        :vehicle_year,
        :vehicle_category,
        :destination_url,
        :page_url,
        :canonical_page_url,
        :referrer,
        :clicked_at,
        :user_agent,
        :language,
        screen: [
          :width,
          :height
        ]
      )

      click_details = turo_click_params.to_h

      click_details["ip_address"] = request.remote_ip
      click_details["request_user_agent"] = request.user_agent
      click_details["received_at"] = Time.current.iso8601

      puts "Attempting to send Turo click email with params: #{click_details.inspect}"

      TuroClickMailer.turo_click_email(click_details).deliver_now

      puts "Turo click email sent successfully"

      render json: {
        success: true,
        message: "Turo click tracked successfully"
      }, status: :ok
    rescue StandardError => e
      puts "Error tracking Turo click: #{e.message}"

      render json: {
        success: false,
        message: "Error tracking Turo click",
        error: e.message
      }, status: :unprocessable_entity
    end
  end
end