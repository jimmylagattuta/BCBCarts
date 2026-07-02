module Api
  class ContactClicksController < ApplicationController
    protect_from_forgery with: :null_session

    def create
      ContactClickMailer.contact_click(contact_click_params.to_h).deliver_later

      render json: { ok: true }, status: :ok
    rescue => error
      Rails.logger.error("[ContactClicksController] #{error.class}: #{error.message}")

      render json: { ok: false }, status: :internal_server_error
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